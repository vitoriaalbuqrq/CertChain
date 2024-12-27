// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certification {
    struct Certificate {
        string candidate_name;
        string certification_name;
        string org_name;
        uint256 emission_date;
        string ipfs_hash;
    }

    mapping(string => Certificate) public certificates;
    mapping(address => string) private authorizedOrganizations;

    address private owner;

    event CertificateGenerated(string certificate_id);
    event OrganizationAuthorized(address organization, string org_name);
    event OrganizationUnauthorized(address organization);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyOrganization() {
        require(bytes(authorizedOrganizations[msg.sender]).length != 0, "Caller is not an authorized organization");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function authorizeOrganization(address _organization, string memory _org_name) public onlyOwner {
        authorizedOrganizations[_organization] = _org_name;
        emit OrganizationAuthorized(_organization, _org_name);
    }

    function unauthorizeOrganization(address _organization) public onlyOwner {
        delete authorizedOrganizations[_organization];
        emit OrganizationUnauthorized(_organization);
    }

    function addCertificate(
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
        require(
            keccak256(bytes(authorizedOrganizations[msg.sender])) == keccak256(bytes(_org_name)),
            "Organization name does not match the authorized address"
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

    function isVerified(string memory _certificate_id) public view returns (bool) {
        return bytes(certificates[_certificate_id].ipfs_hash).length != 0;
    }
}