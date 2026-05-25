// Node calculation utilities

// Returns node degree (connection count)
export function getDegree(id, links) {
  if (!links || links.length === 0) return 0;
  return links.filter(l => l.source?.id === id || l.target?.id === id).length;
}

// Returns node radius based on degree
export function nodeRadius(node, links) {
  return 3 + Math.sqrt(getDegree(node.id, links)) * 1.8;
}
