export type Todo = {
  id: string;
  title: string;
  done: boolean;
  created_at: string;
};

const KEY = "jotter-lite.todos";

/** The list as this browser keeps it (localStorage): each app has its own, and nothing leaves the page. */
const read = (): Todo[] => {
  try {
    const list: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(list) ? (list as Todo[]) : [];
  } catch {
    return [];
  }
};
const write = (todos: Todo[]) => localStorage.setItem(KEY, JSON.stringify(todos));

export const store = {
  list: (): Promise<Todo[]> => Promise.resolve(read()),
  add: (title: string): Promise<Todo> => {
    const todo: Todo = { id: crypto.randomUUID(), title, done: false, created_at: new Date().toISOString() };
    write([todo, ...read()]);
    return Promise.resolve(todo);
  },
  setDone: (id: string, done: boolean): Promise<void> => {
    write(read().map((t) => (t.id === id ? { ...t, done } : t)));
    return Promise.resolve();
  },
  remove: (id: string): Promise<void> => {
    write(read().filter((t) => t.id !== id));
    return Promise.resolve();
  },
};
