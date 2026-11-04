using System;
using System.Collections.Generic;

namespace BetterMeetsXR.Models
{
    public enum NodeType
    {
        Goal,
        Topic,
        Claim,
        Question,
        Evidence,
        Action,
        Proposal
    }

    [Serializable]
    public class IdeaNode
    {
        public string id;
        public string text;
        public string node_type;
        public string author;
        public string parent_id;
        public List<string> parent_ids = new();
        public double created_at;
        public List<string> children_ids = new();
        public string content_hash;
    }

    [Serializable]
    public class ProposalDiff
    {
        public string proposal_id;
        public string parent_id;
        public string node_type;
        public string text;
        public string author;
        public bool has_conflict;
        public string conflict_reason;
        public float alignment_score;
        public string trade_off_analysis;
        public string compromise_synthesis;
    }

    [Serializable]
    public class GhostSprout : ProposalDiff
    {
        public List<string> votes = new();
        public int requiredVotes = 2;
        public bool isMerging = false;
    }

    [Serializable]
    public class TreeSnapshot
    {
        public string meeting_id;
        public int revision;
        public string state_hash;
        public string root_id;
        public Dictionary<string, IdeaNode> nodes = new();
    }

    [Serializable]
    public class TransformRequest
    {
        public string text;
        public string action; // "stretch" or "knead"
    }

    [Serializable]
    public class TransformResponse
    {
        public string original;
        public string transformed;
        public string action;
        public string provider_used;
    }
}
