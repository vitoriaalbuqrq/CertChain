// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certification {
    address public owner;
    mapping(address => bool) public organizations;

    struct Certificate {
        string candidate_name;
        string certification_name;
        string org_name;
        uint256 emission_date;
        string ipfs_hash;
    }

    mapping(string => Certificate) public certificates;

    event certificateGenerated(string certificate_id);

    modifier onlyOrganization() {
        require(organizations[msg.sender] == true, "Only authorized organizations can generate certificates");
        _;
    }

    constructor() {
        owner = msg.sender;
    }


    function addOrganization(address _organization) public {
        
        require(msg.sender == owner, "Only the owner can add organizations");
        organizations[_organization] = true;
    }

    function removeOrganization(address _organization) public {

        require(msg.sender == owner, "Only the owner can remove organizations");
        organizations[_organization] = false;
    }

    function generateCertificate(
        string memory _certificate_id,
        string memory _candidate_name,
        string memory _certification_name,
        string memory _org_name,
        uint256 _emission_date,
        string memory _ipfs_hash
    ) public onlyOrganization {
        require(bytes(_certificate_id).length > 0, "Certificate ID cannot be empty");
        require(bytes(_candidate_name).length > 0, "Candidate name cannot be empty");
        require(bytes(_certification_name).length > 0, "Certification name cannot be empty");
        require(bytes(_org_name).length > 0, "Organization name cannot be empty");
        require(_emission_date > 0, "Emission date must be valid");
        require(bytes(_ipfs_hash).length > 0, "IPFS hash cannot be empty");
        require(
            bytes(certificates[_certificate_id].ipfs_hash).length == 0,
            "Certificate with this ID already exists"
        );

        Certificate memory cert = Certificate({
            candidate_name: _candidate_name,
            certification_name: _certification_name,
            org_name: _org_name,
            emission_date: _emission_date,
            ipfs_hash: _ipfs_hash
        });
        certificates[_certificate_id] = cert;

        emit certificateGenerated(_certificate_id);
    }

    function getCertificate(
        string memory _certificate_id
    ) public view returns (
        string memory _candidate_name,
        string memory _certification_name,
        string memory _org_name,
        uint256 _emission_date,
        string memory _ipfs_hash
    ) {
        Certificate memory cert = certificates[_certificate_id];

        require(bytes(certificates[_certificate_id].ipfs_hash).length != 0, "Certificate with this ID does not exist");

        return (
            cert.candidate_name,
            cert.certification_name,
            cert.org_name,
            cert.emission_date,
            cert.ipfs_hash
        );
    }

    function isVerified(string memory _certificate_id) public view returns (bool) {
        return bytes(certificates[_certificate_id].ipfs_hash).length != 0;
    }
}
