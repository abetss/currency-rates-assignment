export const createRequestActionTypes = baseAction => ({
	START: `${baseAction}_START`,
	IN_PROGRESS: `${baseAction}_IN_PROGRESS`,
	SUCCESS: `${baseAction}_SUCCESS`,
	ERROR: `${baseAction}_ERROR`,
	BASE: baseAction
});
