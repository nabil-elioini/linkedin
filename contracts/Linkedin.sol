// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

contract Linkedin {


    struct Cert {
        string certName;
        string certType;
        bytes32 hash;
        string compName;
        string status;
    }


    struct User {
        address addr;
        string name;
        string surname;
        uint age;
        string email;
        uint certNum;
    }


    struct Company {
        address addr;
        string name;
        string compType;
        string email;
    }


    mapping(address => User) public usersmap;
    mapping(address => Company) public companiesmap;
    mapping(address => mapping(uint => Cert)) public certmap;


    /*event certUploaded(
        address uploaderaddr,
        uint reqnum
    );*/
   
    constructor() {
       
    }


    function registerUser(string calldata _name, string calldata _surname, uint _age, string calldata _email) external  {
        User memory user  = User(msg.sender,_name, _surname, _age, _email, 0);
        usersmap[msg.sender] = user;
    }


    function registerCompany(string calldata _name, string calldata _compType, string calldata _email) external {
        Company memory company = Company(msg.sender, _name, _compType, _email);
        companiesmap[msg.sender] = company;
    }


    function uploadCert(string calldata _certName, string calldata _certType, bytes32 _hash, string calldata _compName) public{
        require (usersmap[msg.sender].addr != 0x0000000000000000000000000000000000000000);
        Cert memory cert = Cert(_certName, _certType, _hash, _compName, "pending");
        certmap[msg.sender][usersmap[msg.sender].certNum] = cert;
        //emit certUploaded(msg.sender, usersmap[msg.sender].reqnum);
        usersmap[msg.sender].certNum = usersmap[msg.sender].certNum+1;
    }


    function verification(address _usrAddr, uint _certNum) public {
        string memory check = certmap[_usrAddr][_certNum].compName;
        require (keccak256(abi.encodePacked(companiesmap[msg.sender].name)) == keccak256(abi.encodePacked(check)));
        certmap[_usrAddr][_certNum].status = "verified";
    }


    function rejection(address _usrAddr, uint _certNum) public {
        require (bytes(companiesmap[msg.sender].name).length != 0);
        certmap[_usrAddr][_certNum].status = "rejected";
    }
}
