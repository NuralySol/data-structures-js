//! Essential Data Structures:
//* Map: The superior Object alternative

// Map has a direct .size property, guarantees insertion order, and allows any type as keys.

// Traditional Object approach:
const userRoles = {};
userRoles['123'] = 'admin';
userRoles['456'] = 'user';

// getting the size property requires Object.key()
console.log(Object.keys(userRoles).length);

// Modern map approach:
const userRolesMap = new Map();
userRolesMap.set(123, 'admin'); // NOTE: assigning numeric key:
userRolesMap.set('456', 'user');
userRolesMap.set(true, 'guest'); // boolean key assignment:
console.log(userRolesMap.size); // an easier access using .size prooperty to see the 'size' of the object created.

//! Real world example: Caching Api responses!
// using Map for efficient Map caching.
class APICache {
    constructor() {
        this.cache = new Map();
    }

    async fetchUser(userID) {
        if (this.cache.has(userID)) {
            console.log('Cache hit!');
            return this.cache.get(userID);
        }

        const userData = await fetch(`api/users/${userID}`).then(r => r.json());
        this.cache.set(userID, userData);
        return userData;
    }
    clearCache() {
        this.cache.clear();
    }

    getCacheSize() {
        return this.cache.size;
    }
}

const cache = new APICache();

//! Set: Unique collections made simple.
// Traditional array approach:
const uniqueUsers = [];
function addUser(user) {
    if (!uniqueUsers.includes(user)) {
        uniqueUsers.push(user);
    }
}


// Modern Set approach:
const uniqueUsersSet = new Set();
function addUserToSet(user) {
    uniqueUsersSet.add(user) // automatically handles uniqueness!
}

//! Real World Example: tag-management system!
class TagManager {
    constructor() {
        this.tags = new Set();
    }

    addTags(...newTags) {
        newTags.forEach(tag => this.tags.add(tag.toLowerCase()));
        return this;
    }

    removeTags(...tagsToRemove) {
        tagsToRemove.forEach(tag => this.tags.delete(tag.toLowerCase()));
        return this;
    }

    hasTag(tag) {
        return this.tags.has(tag.toLowerCase());
    }

    getAllTags() {
        return Array.from(this.tags);
    }

    getTagCount() {
        return this.tags.size;
    }

    // Find common tags between two managers
    getCommonTags(otherManager) {
        return new Set([...this.tags].filter(tag => otherManager.hasTag(tag)));
    }
}


const postTags = new TagManager();
postTags.addTags('JavaScript', 'React', 'javascript'); 
console.log(postTags.getAllTags()); 