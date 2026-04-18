# Task State Machine

A task in "Chores in Hell" follows these statuses:

1.  **New / Active (`active`)**: Assigned to a user, waiting to be done.
2.  **Completed (`done`)**: Task was swiped right. Sent to the void (temporarily shows a "Undo" toast, then disappears).
3.  **Purgatory (`purgatory`)**: Task missed its deadline. It sits in a burning frame waiting for the partner's judgment.
    *   *Auto-Fail:* If 48 hours pass in Purgatory, it goes to `failed`.
    *   *The Overrule:* The original assignee can jump in and do it right now to rescue it back to `active`->`done`.
4.  **Pardoned (`pardoned`)**: Partner granted a 24/48h extension. Task returns to `active`.
5.  **Damned / Failed (`failed`)**: Partner sent it to hell. Task is permanently closed as a failure.
