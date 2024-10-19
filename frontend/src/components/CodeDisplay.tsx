import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose a theme

interface CodeDisplayProps {
  structure: "queue" | "stack" | "default"; // Define the structure type explicitly
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ structure }) => {
  const [language, setLanguage] = useState<"python" | "cpp" | "java">("python"); // Default language

  // Define code snippets with explicit types for languages
  const codeSnippets: Record<
    "queue" | "stack",
    Record<"python" | "cpp" | "java", string>
  > = {
    queue: {
      python: `class Queue:
    def __init__(self):
        self.items = []
        
    def enqueue(self, element):
        self.items.append(element)
        
    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.pop(0)
        
    def is_empty(self):
        return len(self.items) == 0
        
    def display(self):
        return self.items
        
    def peek(self):
        if self.is_empty():
            return None
        return self.items[0]
      `,
      cpp: `class Queue {
  public:
      Queue() {}
      void enqueue(int element) {
          items.push_back(element);
      }
      int dequeue() {
          if (isEmpty()) return -1;
          int front = items.front();
          items.erase(items.begin());
          return front;
      }
      bool isEmpty() {
          return items.empty();
      }
      std::vector<int> display() {
          return items;
      }
      int peek() {
          if (isEmpty()) return -1;
          return items.front();
      }
  private:
      std::vector<int> items;
};`,
      java: `import java.util.LinkedList;

class Queue {
    private LinkedList<Integer> items;

    public Queue() {
        items = new LinkedList<>();
    }

    public void enqueue(int element) {
        items.add(element);
    }

    public Integer dequeue() {
        if (isEmpty()) return null;
        return items.removeFirst();
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public LinkedList<Integer> display() {
        return items;
    }

    public Integer peek() {
        if (isEmpty()) return null;
        return items.getFirst();
    }
}`,
    },
    stack: {
      python: `class Stack:
    def __init__(self):
        self.items = []
        
    def push(self, element):
        self.items.append(element)
        
    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()
        
    def is_empty(self):
        return len(self.items) == 0
        
    def display(self):
        return self.items
        
    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]
      `,
      cpp: `class Stack {
  public:
      Stack() {}
      void push(int element) {
          items.push_back(element);
      }
      int pop() {
          if (isEmpty()) return -1;
          int top = items.back();
          items.pop_back();
          return top;
      }
      bool isEmpty() {
          return items.empty();
      }
      std::vector<int> display() {
          return items;
      }
      int peek() {
          if (isEmpty()) return -1;
          return items.back();
      }
  private:
      std::vector<int> items;
};`,
      java: `import java.util.ArrayList;

class Stack {
    private ArrayList<Integer> items;

    public Stack() {
        items = new ArrayList<>();
    }

    public void push(int element) {
        items.add(element);
    }

    public Integer pop() {
        if (isEmpty()) return null;
        return items.remove(items.size() - 1);
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public ArrayList<Integer> display() {
        return items;
    }

    public Integer peek() {
        if (isEmpty()) return null;
        return items.get(items.size() - 1);
    }
}`,
    },
  };

  // Set default code when on the home screen
  const defaultCode: Record<"python" | "cpp" | "java", string> = {
    python: `Welcome to the Data Structure Visualizer!
    
Select a data structure to see its implementation code here.`,
    cpp: `Welcome to the Data Structure Visualizer!
    
Select a data structure to see its implementation code here.`,
    java: `Welcome to the Data Structure Visualizer!
    
Select a data structure to see its implementation code here.`,
  };

  const codeString =
    structure === "default"
      ? defaultCode[language]
      : codeSnippets[structure]?.[language] ||
        "No code available for selected structure";

  return (
    <div>
      <div>
        <button onClick={() => setLanguage("python")}>Python</button>
        <button onClick={() => setLanguage("cpp")}>C++</button>
        <button onClick={() => setLanguage("java")}>Java</button>
      </div>
      <SyntaxHighlighter language={language} style={oneDark}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
