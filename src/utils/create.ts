const createUniqueId = () => `${Date.now() - Math.random()}`;

const generateId = () => Date.now().toLocaleString();

export { createUniqueId, generateId };
