// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Elect {
     struct Voter {
        address voterAddress;
        bool choice;
        bool hasVoted; // true시 투표 완료, false시 투표 미완료
    }

    struct Candidate {
        address candidateAddress;
        string name;
        string slogan;
        uint8 voteCount;
    }

    enum State { 
        Created,
        Voting,
        Ended
    }

    State public state;
    uint8 candidateTotalCount;
    uint8 voterTotalCount;

    constructor(){
        candidateTotalCount = 0;
        voterTotalCount = 0;
    }


    mapping (address => Candidate) candidateDetails;
    mapping (address => Voter ) voters;

    modifier onlyCandidater(address _candidate){
        require(msg.sender == _candidate);
        _;
    }

    modifier inState(State _state){
        require(state == _state);
        _;
    }

    function getCandidateNumber() public view returns(uint8){
        return candidateTotalCount;
    }

    function addCandidate(string memory _candidateName, string memory _slogan) 
        public
        inState(State.Created)
    {
        Candidate memory c;
        c.candidateAddress = msg.sender;
        c.name = _candidateName;
        c.slogan = _slogan;
        c.voteCount = 0;
        candidateDetails[msg.sender] = c;
        candidateTotalCount++;

        if(candidateTotalCount >= 5){
            startVote();
        }
    }

    function startVote()
        public
        inState(State.Created)
    {
        state = State.Voting;
    }

    function voting(bool _choice)
        public
        inState(State.Voting)
    {
        if(!voters[msg.sender].hasVoted){
            voters[msg.sender].hasVoted = true;
            Voter memory v;
            v.voterAddress = msg.sender;
            v.choice = _choice;
            v.hasVoted = true;

            voters[msg.sender] = v;
            voterTotalCount++;       
        }
    }

    function winningVote() 
        public 
        view 
        returns(uint _winningVote)
    {
        uint winningVoteCount = 5;
        for(uint p = 0; p < bytes(candidateDetails.length); p++){
            if(candidateDetails[p].voteCount >= winningVoteCount){
                winningVoteCount = candidateDetails[p].voteCount;
                _winningVote = p;
            }
        }
    }
}