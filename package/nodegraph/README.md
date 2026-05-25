# NodeGraph React Component

An interactive, force-directed graph visualization component for React with advanced physics simulation and real-time rendering capabilities powered by D3.js.

## Features

- **Interactive Visualization**: Real-time graph rendering with D3 force simulation
- **Physics Engine**: Customizable force-directed layout with node repulsion, link attraction, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Controlled Interaction**: Full control over node positioning, styling, and behavior
- **Advanced Customization**: Label rendering, custom styling, and flexible API
- **Performance Optimized**: Efficient canvas rendering for smooth animations

## Installation

```bash
npm install @nelson-5553/nodegraph-react
```

or with pnpm:

```bash
pnpm install @nelson-5553/nodegraph-react
```

## Quick Start

```tsx
import { NodeGraph } from '@nelson-5553/nodegraph-react';

const nodes = [
  { id: '1', label: 'Node 1' },
  { id: '2', label: 'Node 2' },
];

const links = [
  { source: '1', target: '2' }
];

export default function App() {
  return (
    <NodeGraph 
      nodes={nodes} 
      links={links}
      width={800}
      height={600}
    />
  );
}
```

## API

### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `nodes` | `Array<{id: string, name: string, group?: number}>` | Array of node objects | Required |
| `links` | `Array<[string, string]>` | Array of link pairs `[source, target]` | Required |
| `width` | `string \| number` | Canvas width (e.g., "100%" or 800) | "100%" |
| `height` | `string \| number` | Canvas height (e.g., "100%" or 600) | "100%" |
| `colors` | `string[]` | Array of hex colors for node groups | `['#3b82f6', '#8b5cf6', '#ec4899']` |
| `viewGuide` | `boolean` | Show/hide control panel for physics adjustments | `false` |
| `repulsion` | `number` | Force repulsion between nodes | 150 |
| `linkDistance` | `number` | Desired distance between connected nodes | 65 |
| `className` | `string` | CSS classes for the container | `"bg-white"` |
| `linkColor` | `string` | Color of link lines (hex or rgba) | `"rgba(59,130,246,0.5)"` |
| `linkWidth` | `number` | Width of link lines in pixels | 1.5 |
| `linkHoverColor` | `string` | Color of links on hover | `"#0369a1"` |
| `linkHoverWidth` | `number` | Width of links on hover | 2.2 |
| `nodeHoverColor` | `string` | Color of nodes on hover | `"#0369a1"` |
| `nodeLabelColor` | `string` | Color of node labels text | `"#1e293b"` |
| `nodeLabelHoverColor` | `string` | Color of node labels on hover | `"#0369a1"` |
| `nodeLabelFontSize` | `number` | Font size of node labels in pixels | 11 |
| `nodeLabelShowOnHover` | `boolean` | Show labels only on hover | `false` |
| `nodeLabelMinDegree` | `number` | Minimum node degree to display label | 4 |
| `nodeLabelMinScale` | `number` | Minimum zoom scale to display labels | 0.5 |

## Usage Examples

The component supports:

- **Basic Visualization**: Simple graph rendering
- **Controlled Interaction**: Drag nodes and interact with the graph
- **Custom Styling**: Style nodes, links, and labels
- **Physics Control**: Configure force simulation parameters
- **Label Customization**: Custom label rendering and positioning

## Peer Dependencies

- React >= 18.0.0
- React DOM >= 18.0.0

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, feature requests, or questions, please open an issue on the repository.
