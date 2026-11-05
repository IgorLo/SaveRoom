import { getProjects } from '../src/entities/project/server';

const projects = await getProjects();
console.log(`Validated ${projects.length} publications and their image files.`);
