import fs from 'fs';

// This file will server as the "DB" for the metadata and state of the application
enum VariableSelection {
    Value,
    Options
}

interface Variable {
    name: string;
    description: string;
    tags?: string[];
    defaultValue?: any;
    value: any;
    history: any[];
}

// Options variable must have a default value and a list of options
function openMetadataFile(): Record<string, Variable> {
    try {
        const data = fs.readFileSync('metadata.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw new Error('Could not open metadata file');
    }
}


export function addVariable({ name, description, tags, defaultValue, value }: Variable) {
    const metadata = openMetadataFile();

    // Check if the variable already exists
    if (metadata[name]) {
        // If it does, throw an error
        throw new Error(`Variable ${name} already exists`);
    }

    // Create the variable
    metadata[name] = {
        name,
        description,
        tags,
        defaultValue,
        value,
        history: [value]
    };
}

export function readVariable(name: string) {
    const metadata = openMetadataFile();

    if (!metadata[name]) {
        throw new Error(`Variable ${name} does not exist`);
    }

    return metadata[name];
}