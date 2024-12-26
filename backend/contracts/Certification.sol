// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certification {
    struct Certificate {
        string candidate_name;
        string certification_name;
        string org_name;
        uint256 emission_date;
        string ipfs_hash;
    }

    mapping(string => Certificate) private certificates;
    mapping(address => bool) private authorizedOrganizations;

    address private owner;

    event CertificateGenerated(string certificate_id);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyOrganization() {
        require(authorizedOrganizations[msg.sender], "Caller is not an authorized organization");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function authorizeOrganization(address _organization) public onlyOwner {
        authorizedOrganizations[_organization] = true;
    }

    function addCertificate(
        string memory _certificate_id,
        string memory _candidate_name,
        string memory _certification_name,
        string memory _org_name,
        uint256 _emission_date,
        string memory _ipfs_hash
    ) public onlyOrganization {
        require(
            bytes(certificates[_certificate_id].ipfs_hash).length == 0,
            "Certificate with this ID already exists"
        );
        certificates[_certificate_id] = Certificate({
            candidate_name: _candidate_name,
            certification_name: _certification_name,
            org_name: _org_name,
            emission_date: _emission_date,
            ipfs_hash: _ipfs_hash
        });

        emit CertificateGenerated(_certificate_id);
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
        Certificate storage cert = certificates[_certificate_id];

        require(bytes(cert.ipfs_hash).length != 0, "Certificate with this ID does not exist");

        return (
            cert.candidate_name,
            cert.certification_name,
            cert.org_name,
            cert.emission_date,
            cert.ipfs_hash
        );
    }
}