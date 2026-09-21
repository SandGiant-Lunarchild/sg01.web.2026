import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/sweeper/")({
    component: MineSweeperPage,
});

function MineSweeperPage() {
  return (
    <p>To be implemented.</p>
  );
}
