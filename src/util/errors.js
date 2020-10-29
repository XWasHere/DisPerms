class DatabaseError extends Error {}

class DatabaseAlreadyLoadedError extends DatabaseError {}
class DatabaseNotLoadedError extends DatabaseError {}

module.exports = {DatabaseError, DatabaseAlreadyLoadedError, DatabaseNotLoadedError}