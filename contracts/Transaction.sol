pragma solidity ^0.5.2;

import "./ERC721MetadataMintable.sol";


/**
 * @title ERC721MetadataMintable
 * @dev ERC721 minting logic with metadata
 */
contract Transaction {
    address public minter;
    
    struct deal {
        uint256 amountETH;
        string description;
        bool buyerAccepted;
        bool sellerAccepted;
        string uri;
        uint256 tokenId;
    }
    
    mapping(address => address[]) public activeDeals;
    mapping(address => mapping(address => deal)) public dealList;
    
    modifier checkExist(address _buyer, address _seller) {
        require(bytes(dealList[_buyer][_seller].description).length != 0, "Cannot Find Offer");
        _;
    }
    
    modifier checkNotExist(address _buyer, address _seller) {
        require(bytes(dealList[_buyer][_seller].description).length == 0, "Offer already exist");
        _;
    }
    
    constructor(address _minter) public {
        minter = _minter;
    }
    
    function offer(string memory _description, address _to, uint256 _amountETH) checkNotExist(msg.sender, _to) public {
        require(bytes(_description).length != 0, "Please add description");
        dealList[msg.sender][_to].description = _description;
        dealList[msg.sender][_to].amountETH = _amountETH;
        dealList[msg.sender][_to].buyerAccepted = true;
        dealList[msg.sender][_to].sellerAccepted = false;
        activeDeals[msg.sender].push(_to);
        activeDeals[_to].push(msg.sender);
    }
    
    function counterOffer(address _buyer, uint256 _amountETH) checkExist(_buyer, msg.sender) public {
        dealList[_buyer][msg.sender].amountETH = _amountETH;
        dealList[_buyer][msg.sender].buyerAccepted = false;
        dealList[_buyer][msg.sender].sellerAccepted = true;
    }
    
    function newOffer(address _seller, uint256 _amountETH) checkExist(msg.sender, _seller) public {
        dealList[msg.sender][_seller].amountETH = _amountETH;
        dealList[msg.sender][_seller].buyerAccepted = true;
        dealList[msg.sender][_seller].sellerAccepted = false;
    }
    
    function acceptOffer(address _buyer) checkExist(_buyer, msg.sender) public {
        dealList[_buyer][msg.sender].sellerAccepted = true;
    }
    
    function acceptCounterOffer(address _seller) checkExist(msg.sender, _seller) public {
        dealList[msg.sender][_seller].buyerAccepted = true;
    }
    
    function submitWork(address _buyer, string memory _uri) checkExist(_buyer, msg.sender) public {
        require(dealList[_buyer][msg.sender].buyerAccepted && dealList[_buyer][msg.sender].sellerAccepted, "Need to Accept offer");
        dealList[_buyer][msg.sender].uri = _uri;
        uint256 totalSupply = ERC721MetadataMintable(minter).totalSupply();
        ERC721MetadataMintable(minter).mintWithTokenURI(msg.sender, totalSupply, _uri);
        dealList[_buyer][msg.sender].tokenId = totalSupply;
    }
    
    function acceptWork(address _seller) checkExist(msg.sender, _seller) public payable {
        require(dealList[msg.sender][_seller].buyerAccepted && dealList[msg.sender][_seller].sellerAccepted, "Need to Accept offer");
        require(msg.value >= dealList[msg.sender][_seller].amountETH, "Insufficient amountETH");
        ERC721MetadataMintable(minter).safeTransferFrom(_seller, msg.sender, dealList[msg.sender][_seller].tokenId);
        address payable seller = address(uint160(_seller));
        seller.transfer(dealList[msg.sender][_seller].amountETH);
        rejectWork(_seller);
    }
    
    function rejectWork(address _seller) checkExist(msg.sender, _seller) public {
        dealList[msg.sender][_seller].amountETH = 0;
        dealList[msg.sender][_seller].description = "";
        dealList[msg.sender][_seller].buyerAccepted = false;
        dealList[msg.sender][_seller].sellerAccepted = false;
        dealList[msg.sender][_seller].uri = "";
        dealList[msg.sender][_seller].tokenId = 0;
    }
}