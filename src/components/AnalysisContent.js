import React from 'react';

function NoFormIssueComponent() {

}

export function analysisComponent(issue) {
    // return <NoFormIssueComponent />;
}

const noIssue = {
    diagnosis: "Good Form!"
};

const overstriding = {
    diagnosis: "Overstriding", 
    meaning: "Landing foot lands significantly in front of the center of mass (under the hips). Think of it as a braking motion as you run.",
    concern: "Increased impact goes through legs, especially shins and knees. Often times leads to shin splints and knee pain.",
    signs: [
        "Loud or heavy landings", 
        "Shoes more worn on the back, outside corner of running shoes",
        "Knee or shin pain/soreness"
    ],
    fixes: [
        "Try landing closer to center of mass (under hips)",
        "Increase cadence from near 160 strikes per minute (spm) to near 170+ (spm)"
    ]
};