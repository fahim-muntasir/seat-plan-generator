import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SortableItem from "./Item";
import { ProcessedData } from "@/types";

interface SeatPlanDisplayProps {
  seatPlan: ProcessedData;
  roomConfigs: Array<{ name: string; columns: number; capacity: number }>;
  onConfigChange: (
    index: number,
    newConfig: { name: string; columns: number; capacity: number }
  ) => void;
  onChange: (newSeatPlan: ProcessedData) => void;
  onAddRoom: () => void;
  onRemoveRoom: (index: number) => void;
}

export default function SeatPlanDisplay({
  seatPlan,
  roomConfigs,
  onConfigChange,
  onChange,
  onAddRoom,
  onRemoveRoom,
}: SeatPlanDisplayProps) {
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function hasId(obj: unknown): obj is { id: string } {
    return typeof obj === 'object' && obj !== null && 'id' in obj && typeof obj.id === 'string';
  }
  

  const handleConfigChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newConfig = {
      ...roomConfigs[index],
      [name]: name === "name" ? value : parseInt(value, 10),
    };
    onConfigChange(index, newConfig);
  };

  const handleCellEdit = (
    roomIndex: number,
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newSeatPlan = { ...seatPlan };
    newSeatPlan.rooms[roomIndex][rowIndex][colIndex] = value;
    onChange(newSeatPlan);
    setEditingCell(null);
  };

  const onDragEnd = ({ active, over }: { active: unknown; over: unknown }) => {
    console.log("active==", active);
    console.log("over==", over);

    if (!hasId(active) || !hasId(over)) return;

    if (active.id === over.id) return;

    const [activeRoom, activeRow, activeCol] = active.id.split("-").map(Number);
    const [overRoom, overRow, overCol] = over.id.split("-").map(Number);

    const newSeatPlan = { ...seatPlan };

    const temp = newSeatPlan.rooms[activeRoom][activeRow][activeCol];
    newSeatPlan.rooms[activeRoom][activeRow][activeCol] =
      newSeatPlan.rooms[overRoom][overRow][overCol];
    newSeatPlan.rooms[overRoom][overRow][overCol] = temp;

    onChange(newSeatPlan);
  };

  return (
    <div className="mt-8">
      <Button onClick={onAddRoom} className="mb-4">
        Add Room
      </Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        modifiers={[restrictToParentElement]}
      >
        {seatPlan.rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="mb-8 border p-4 rounded">
            <div className="mb-4 flex space-x-4 items-end">
              <div>
                <Label htmlFor={`roomName-${roomIndex}`}>Room Name</Label>
                <Input
                  type="text"
                  id={`roomName-${roomIndex}`}
                  name="name"
                  value={roomConfigs[roomIndex].name}
                  onChange={(e) => handleConfigChange(roomIndex, e)}
                />
              </div>
              <div>
                <Label htmlFor={`columns-${roomIndex}`}>Columns</Label>
                <Input
                  type="number"
                  id={`columns-${roomIndex}`}
                  name="columns"
                  value={roomConfigs[roomIndex].columns}
                  onChange={(e) => handleConfigChange(roomIndex, e)}
                  min={1}
                />
              </div>
              <div>
                <Label htmlFor={`capacity-${roomIndex}`}>Capacity</Label>
                <Input
                  type="number"
                  id={`capacity-${roomIndex}`}
                  name="capacity"
                  value={roomConfigs[roomIndex].capacity}
                  onChange={(e) => handleConfigChange(roomIndex, e)}
                  min={1}
                />
              </div>
              <Button
                onClick={() => onRemoveRoom(roomIndex)}
                variant="destructive"
              >
                Remove Room
              </Button>
            </div>
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${roomConfigs[roomIndex].columns}, minmax(0, 1fr))`,
              }}
            >
              <SortableContext
                items={room
                  .flat()
                  .map(
                    (_, idx) =>
                      `${roomIndex}-${Math.floor(idx / room[0].length)}-${
                        idx % room[0].length
                      }`
                  )}
                strategy={rectSortingStrategy}
              >
                {room.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <SortableItem
                      key={`${roomIndex}-${rowIndex}-${colIndex}`}
                      id={`${roomIndex}-${rowIndex}-${colIndex}`}
                      editing={
                        editingCell === `${roomIndex}-${rowIndex}-${colIndex}`
                      }
                      value={cell}
                      onEdit={(value) =>
                        handleCellEdit(roomIndex, rowIndex, colIndex, value)
                      }
                      onStartEdit={() =>
                        setEditingCell(`${roomIndex}-${rowIndex}-${colIndex}`)
                      }
                    />
                  ))
                )}
              </SortableContext>
            </div>
          </div>
        ))}
      </DndContext>
    </div>
  );
}
