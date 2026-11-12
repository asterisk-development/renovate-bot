module.exports = {
    platform: "github",
    autodiscover: true,
    autodiscoverFilter: ["asterisk-development/*"],
    onboarding: true,
    dependencyDashboard: false,
    suppressNotifications: ["configErrorIssue"],
    onboardingConfig: {
        extends: ["config:recommended"],
        // dependencyDashboard: false,
        minimumReleaseAge: "3 days",
        packageRules: [
            { matchUpdateTypes: ["minor", "patch"], automerge: true },
            { matchUpdateTypes: ["major"], automerge: false },
        ],
    },
};
