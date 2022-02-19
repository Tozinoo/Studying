// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11 <0.9.0;

contract Election{
    // Store candidate
    // Read candidate
    string public candidate;
    // Constructor
    constructor() public {
        candidate = "Candidate 1";
    }
}