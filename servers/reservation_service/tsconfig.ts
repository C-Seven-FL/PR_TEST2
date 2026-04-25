{
    "compilerOptions": {
        "target": "ES2020",
        "module": "node16",
        "rootDir": "src",
        "outDir": "dist",
        "moduleResolution": "node16",
        "esModuleInterop": true,
        "strict": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "typeRoots": [
            "./src/types",
            "./node_modules/@types"
        ]
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}