import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const samplePastes = [
  {
    slug: "hello-world",
    title: "Hello World - Python",
    content: `#!/usr/bin/env python3
"""Simple Hello World program"""

def greet(name: str) -> str:
    """Return a greeting message."""
    return f"Hello, {name}! Welcome to EnoPaste."

if __name__ == "__main__":
    print(greet("World"))
    print("EnoPaste is ready to use!")
`,
    language: "python",
    visibility: "public",
    views: 42,
  },
  {
    slug: "react-hook",
    title: "Custom React Hook - useLocalStorage",
    content: `"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// Usage:
// const [name, setName] = useLocalStorage("name", "Guest");
`,
    language: "typescript",
    visibility: "public",
    views: 128,
  },
  {
    slug: "docker-compose",
    title: "Docker Compose - PostgreSQL + Redis",
    content: `version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: app-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: app-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
`,
    language: "yaml",
    visibility: "public",
    views: 89,
  },
  {
    slug: "bash-utility",
    title: "Bash Utility - Project Setup Script",
    content: `#!/bin/bash

# Project Setup Script
# Usage: ./setup.sh [project-name]

set -euo pipefail

PROJECT_NAME=\${1:-"my-project"}
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

echo -e "\${BLUE}Setting up project: \${PROJECT_NAME}\${NC}"

# Create directory structure
mkdir -p "\${PROJECT_NAME}"/{src,tests,docs,config}
cd "\${PROJECT_NAME}"

# Initialize git
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore

# Create package.json
cat > package.json << EOF
{
  "name": "\${PROJECT_NAME}",
  "version": "1.0.0",
  "scripts": {
    "dev": "echo 'Add your dev command'",
    "build": "echo 'Add your build command'",
    "test": "echo 'Add your test command'"
  }
}
EOF

# Create README
cat > README.md << EOF
# \${PROJECT_NAME}

## Getting Started

\\\`\\\`\\\`bash
npm install
npm run dev
\\\`\\\`\\\`
EOF

echo -e "\${GREEN}Project \${PROJECT_NAME} created successfully!\${NC}"
`,
    language: "bash",
    visibility: "public",
    views: 67,
  },
  {
    slug: "sql-queries",
    title: "Common SQL Queries Reference",
    content: `-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (email, name) VALUES
    ('john@example.com', 'John Doe'),
    ('jane@example.com', 'Jane Smith');

-- Complex query with joins
SELECT
    u.name,
    u.email,
    COUNT(p.id) as post_count,
    MAX(p.created_at) as last_post
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name, u.email
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC;

-- Update with subquery
UPDATE posts
SET published = true
WHERE user_id IN (
    SELECT id FROM users WHERE email LIKE '%@example.com'
);
`,
    language: "sql",
    visibility: "public",
    views: 156,
  },
  {
    slug: "go-api",
    title: "Go - Simple HTTP Server",
    content: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "time"
)

type Response struct {
    Message   string \`json:"message"\`
    Timestamp string \`json:"timestamp"\`
}

type HealthCheck struct {
    Status  string \`json:"status"\`
    Uptime  string \`json:"uptime"\`
    Version string \`json:"version"\`
}

var startTime = time.Now()

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("/", handleRoot)
    mux.HandleFunc("/health", handleHealth)
    mux.HandleFunc("/api/greet", handleGreet)

    server := &http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    fmt.Println("Server starting on :8080")
    log.Fatal(server.ListenAndServe())
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
    respond(w, Response{
        Message:   "Welcome to the API",
        Timestamp: time.Now().Format(time.RFC3339),
    })
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
    respond(w, HealthCheck{
        Status:  "healthy",
        Uptime:  time.Since(startTime).String(),
        Version: "1.0.0",
    })
}

func handleGreet(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" {
        name = "World"
    }
    respond(w, Response{
        Message:   fmt.Sprintf("Hello, %s!", name),
        Timestamp: time.Now().Format(time.RFC3339),
    })
}

func respond(w http.ResponseWriter, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(data)
}
`,
    language: "go",
    visibility: "public",
    views: 203,
  },
  {
    slug: "rust-examples",
    title: "Rust - Common Patterns",
    content: `use std::collections::HashMap;

// Struct with implementation
#[derive(Debug, Clone)]
struct User {
    name: String,
    email: String,
    age: u32,
}

impl User {
    fn new(name: &str, email: &str, age: u32) -> Self {
        Self {
            name: name.to_string(),
            email: email.to_string(),
            age,
        }
    }

    fn is_adult(&self) -> bool {
        self.age >= 18
    }

    fn display(&self) -> String {
        format!("{} ({})", self.name, self.email)
    }
}

// Enum with data
enum Command {
    Add(String),
    Remove(String),
    List,
    Quit,
}

fn process_command(cmd: Command) {
    match cmd {
        Command::Add(item) => println!("Adding: {}", item),
        Command::Remove(item) => println!("Removing: {}", item),
        Command::List => println!("Listing all items"),
        Command::Quit => println!("Goodbye!"),
    }
}

// Error handling with Result
fn parse_age(input: &str) -> Result<u32, String> {
    input
        .parse::<u32>()
        .map_err(|e| format!("Invalid age: {}", e))
        .and_then(|age| {
            if age <= 150 {
                Ok(age)
            } else {
                Err("Age must be between 0 and 150".to_string())
            }
        })
}

fn main() {
    // Using HashMap
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 87);

    // Iterating
    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }

    // Pattern matching
    let cmd = Command::Add("item".to_string());
    process_command(cmd);

    // Error handling
    match parse_age("25") {
        Ok(age) => println!("Parsed age: {}", age),
        Err(e) => println!("Error: {}", e),
    }
}
`,
    language: "rust",
    visibility: "public",
    views: 178,
  },
  {
    slug: "json-config",
    title: "Next.js Configuration Example",
    content: `{
  "name": "my-next-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^5.0.0",
    "zod": "^3.22.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "prisma": "^5.0.0",
    "tsx": "^4.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
`,
    language: "json",
    visibility: "public",
    views: 94,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.paste.deleteMany();

  // Insert sample pastes
  for (const paste of samplePastes) {
    await prisma.paste.create({
      data: {
        ...paste,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ),
      },
    });
    console.log(`Created paste: ${paste.title}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
