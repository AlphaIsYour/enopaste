// Lightweight syntax highlighter using browser-native approach
// For production, consider using Prism.js or highlight.js

export function highlightCode(code: string, language: string): string {
  if (language === "text" || !language) {
    return escapeHtml(code);
  }

  // Simple pattern-based highlighting
  const patterns: Record<string, RegExp[]> = {
    javascript: [
      // Keywords
      /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|default|from|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|delete|void|null|undefined|true|false|NaN|Infinity)\b/g,
      // Strings
      /(["'`])(?:(?!\1|\\).|\\.)*\1/g,
      // Comments
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      // Numbers
      /\b(\d+\.?\d*)\b/g,
      // Functions
      /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    ],
    typescript: [
      /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|default|from|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|delete|void|null|undefined|true|false|NaN|Infinity|interface|type|enum|namespace|declare|abstract|implements|readonly|private|protected|public|static|override|as|is|keyof|infer|never|unknown|any|void|string|number|boolean|bigint|symbol|object)\b/g,
      /(["'`])(?:(?!\1|\\).|\\.)*\1/g,
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      /\b(\d+\.?\d*)\b/g,
      /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    ],
    python: [
      /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|yield|lambda|pass|break|continue|and|or|not|in|is|None|True|False|self|print|len|range|type|str|int|float|list|dict|tuple|set|bool|bytes|object|super|global|nonlocal|async|await|del|assert)\b/g,
      /(#.*$)/gm,
      /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
      /\b(\d+\.?\d*)\b/g,
      /@\w+/g,
    ],
    java: [
      /\b(public|private|protected|static|final|abstract|synchronized|volatile|transient|native|class|interface|enum|extends|implements|import|package|if|else|for|while|do|switch|case|break|continue|return|new|this|super|try|catch|finally|throw|throws|void|int|long|short|byte|float|double|boolean|char|String|null|true|false|instanceof|default|assert|const|goto|var|record|sealed|permits)\b/g,
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      /("(?:[^"\\]|\\.)*")/g,
      /\b(\d+\.?\d*[fFlLdD]?)\b/g,
    ],
    go: [
      /\b(package|import|func|return|if|else|for|range|switch|case|default|break|continue|go|defer|chan|select|map|struct|interface|type|const|var|fallthrough|goto|nil|true|false|iota|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print|println|real|recover|error|string|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|uintptr|byte|rune|float32|float64|complex64|complex128|bool)\b/g,
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      /("(?:[^"\\]|\\.)*"|`[^`]*`)/g,
      /\b(\d+\.?\d*)\b/g,
    ],
    rust: [
      /\b(fn|let|mut|const|static|struct|enum|impl|trait|type|mod|use|pub|crate|self|super|where|if|else|match|for|while|loop|break|continue|return|move|ref|async|await|unsafe|extern|dyn|as|in|true|false|Some|None|Ok|Err|Self|String|Vec|Box|Rc|Arc|Option|Result|bool|char|f32|f64|i8|i16|i32|i64|i128|isize|u8|u16|u32|u64|u128|usize|str)\b/g,
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      /("(?:[^"\\]|\\.)*")/g,
      /\b(\d+\.?\d*)\b/g,
    ],
    sql: [
      /\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|GROUP|BY|ORDER|ASC|DESC|LIMIT|OFFSET|HAVING|UNION|ALL|DISTINCT|NULL|IS|BETWEEN|LIKE|EXISTS|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END|BEGIN|COMMIT|ROLLBACK|GRANT|REVOKE|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|DEFAULT|CHECK|UNIQUE|CASCADE|TRIGGER|VIEW|PROCEDURE|FUNCTION|RETURNS|DECLARE|IF|WHILE|FOR|LOOP|EXIT|CONTINUE|TRUE|FALSE|UNKNOWN|BOOLEAN|INTEGER|FLOAT|DECIMAL|VARCHAR|CHAR|TEXT|DATE|TIMESTAMP|INTERVAL|BLOB|CLOB|SERIAL|BIGSERIAL)\b/gi,
      /(--.*$|\/\*[\s\S]*?\*\/)/gm,
      /('(?:[^'\\]|\\.)*')/g,
      /\b(\d+\.?\d*)\b/g,
    ],
    html: [
      /(&lt;\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[a-zA-Z-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]*))?)*\s*\/?\s*&gt;)/g,
      /(&lt;!--[\s\S]*?--&gt;)/g,
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    ],
    css: [
      /([a-zA-Z-]+)\s*(?=:)/g,
      /(#[0-9a-fA-F]{3,8})\b/g,
      /(\d+\.?\d*(?:px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|deg|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?)\b/g,
      /(@[a-zA-Z-]+)/g,
      /(\.[a-zA-Z][\w-]*)/g,
      /(#[a-zA-Z][\w-]*)/g,
      /(\/\*[\s\S]*?\*\/)/gm,
    ],
    json: [
      /("(?:[^"\\]|\\.)*")\s*(?=:)/g,
      /("(?:[^"\\]|\\.)*")/g,
      /\b(\d+\.?\d*)\b/g,
      /\b(true|false|null)\b/g,
    ],
    bash: [
      /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|local|export|source|alias|unalias|cd|ls|grep|sed|awk|find|xargs|cat|echo|printf|read|test|true|false|null|in|select|until|declare|typeset|readonly|shift|unset|trap|wait|kill|bg|fg|jobs|set|unset|shopt|eval|exec|command|builtin|enable|hash|help|type|which|whereis|whatis|man|info|apropos)\b/g,
      /(#.*$)/gm,
      /("(?:[^"\\]|\\.)*"|'[^']*')/g,
      /\$(?:\{[^}]+\}|[a-zA-Z_][\w]*|\([^)]+\))/g,
      /\b(\d+)\b/g,
    ],
    markdown: [
      /^(#{1,6}\s.*)$/gm,
      /(\*\*.*?\*\*|__.*?__)/g,
      /(\*.*?\*|_.*?_)/g,
      /(```[\s\S]*?```)/g,
      /(`[^`]+`)/g,
      /(\[.*?\]\(.*?\))/g,
      /^(\s*[-*+]\s)/gm,
      /^(\s*\d+\.\s)/gm,
      /^(>\s.*)$/gm,
    ],
  };

  const langPatterns = patterns[language] || patterns["javascript"];
  let highlighted = escapeHtml(code);

  // Apply patterns in order of precedence
  langPatterns.forEach((pattern, index) => {
    const className = getClassNameForPattern(language, index);
    highlighted = highlighted.replace(pattern, (match) => {
      return `<span class="${className}">${match}</span>`;
    });
  });

  return highlighted;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClassNameForPattern(language: string, patternIndex: number): string {
  const classMap: Record<string, string[]> = {
    javascript: [
      "syntax-keyword",
      "syntax-string",
      "syntax-comment",
      "syntax-number",
      "syntax-function",
    ],
    typescript: [
      "syntax-keyword",
      "syntax-string",
      "syntax-comment",
      "syntax-number",
      "syntax-function",
    ],
    python: [
      "syntax-keyword",
      "syntax-comment",
      "syntax-string",
      "syntax-number",
      "syntax-decorator",
    ],
    java: [
      "syntax-keyword",
      "syntax-comment",
      "syntax-string",
      "syntax-number",
    ],
    go: [
      "syntax-keyword",
      "syntax-comment",
      "syntax-string",
      "syntax-number",
    ],
    rust: [
      "syntax-keyword",
      "syntax-comment",
      "syntax-string",
      "syntax-number",
    ],
    sql: [
      "syntax-keyword",
      "syntax-comment",
      "syntax-string",
      "syntax-number",
    ],
    html: [
      "syntax-tag",
      "syntax-comment",
      "syntax-attr",
    ],
    css: [
      "syntax-property",
      "syntax-color",
      "syntax-number",
      "syntax-atrule",
      "syntax-class",
      "syntax-id",
      "syntax-comment",
    ],
    json: [
      "syntax-property",
      "syntax-string",
      "syntax-number",
      "syntax-boolean",
    ],
    bash: [
      "syntax-keyword",
      "syntax-comment",
      "syntax-string",
      "syntax-variable",
      "syntax-number",
    ],
    markdown: [
      "syntax-heading",
      "syntax-bold",
      "syntax-italic",
      "syntax-code",
      "syntax-inline-code",
      "syntax-link",
      "syntax-list",
      "syntax-ordered-list",
      "syntax-blockquote",
    ],
  };

  const classes = classMap[language] || classMap["javascript"];
  return classes[patternIndex] || "syntax-default";
}
