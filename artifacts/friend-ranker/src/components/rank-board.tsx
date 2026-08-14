import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export function RankBoard({
  items,
  onReorder,
  topLabel,
  bottomLabel,
  movableId,
  highlightId,
}: {
  items: string[]
  onReorder: (next: string[]) => void
  topLabel: string
  bottomLabel: string
  movableId?: string
  highlightId?: string
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over || event.active.id === event.over.id) return
    const oldIndex = items.indexOf(event.active.id as string)
    const newIndex = items.indexOf(event.over.id as string)
    if (oldIndex === -1 || newIndex === -1) return
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex w-8 shrink-0 flex-col items-center sm:w-10"><span className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">most</span><div className="w-2.5 flex-1 rounded-full sm:w-3" style={{ background: "var(--spectrum)" }} aria-hidden="true" /><span className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">least</span></div>
      <div className="flex-1">
        <div className="mb-2 flex items-baseline justify-between gap-2 text-xs text-muted-foreground"><span className="truncate">{topLabel}</span><span className="truncate text-right">{bottomLabel}</span></div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className="flex flex-col gap-2">{items.map((word, index) => <SortableRow key={word} id={word} index={index} draggable={!movableId || word === movableId} highlighted={highlightId === word} />)}</ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

function SortableRow({ id, index, draggable, highlighted }: { id: string; index: number; draggable: boolean; highlighted: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: !draggable })
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={cn("flex items-center gap-3 rounded-2xl border bg-card px-3 py-3 select-none touch-none sm:px-4", isDragging && "z-10 shadow-2xl ring-2 ring-primary", highlighted ? "border-primary/70 bg-primary/10" : "border-border")}>
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold tabular-nums", highlighted ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")} aria-hidden="true">{index + 1}</span>
      <span className="flex-1 text-pretty text-base font-medium leading-snug sm:text-lg">{id}</span>
      {draggable ? <button type="button" className="flex h-9 w-9 shrink-0 cursor-grab items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground active:cursor-grabbing" aria-label={`Drag ${id} to reorder`} {...attributes} {...listeners}><GripVertical className="h-5 w-5" /></button> : <span className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground/40" aria-hidden="true"><Lock className="h-4 w-4" /></span>}
    </li>
  )
}