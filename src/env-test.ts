// Simple test to check if environment variables are loading
console.log('=== Environment Test ===');
console.log('Mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('DEV:', import.meta.env.DEV);
console.log('PROD:', import.meta.env.PROD);
console.log('All env:', import.meta.env);

export { }; 