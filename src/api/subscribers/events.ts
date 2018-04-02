/**
 * events
 * ---------------------
 * Define all your possible custom events here.
 */
export const events = {
    user: {
        created: "onUserCreate",
    },
    pet: {
        created: "onPetCreate",
    },
    omnia: {
        aspect: {
            created: "onOmniaAspectCreated",
        },
        entry: {
            created: "onOmniaEntryCreated",
        },
        enumeration: {
            created: "onEnumerationCreated",
        },
    },
};
