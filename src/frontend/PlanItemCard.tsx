import React from 'react';
import type { PlanItem } from './types';

interface PlanItemCardProps {
  item: PlanItem;
  index: number;
  count: number;
  onEdit: () => void;
  onDelete: () => void;
  onPromote: () => void;
  promoting: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}

export const PlanItemCard: React.FC<PlanItemCardProps> = ({
  item, index, count, onEdit, onDelete, onPromote, promoting,
  onMoveUp, onMoveDown, onDragStart, onDragOver, onDrop,
}) => {
  return (
    <div
      className="cgi-plan-card cgi-plan-item"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <span className="cgi-plan-drag" title="Drag to reorder">⠿</span>
      <span className="cgi-plan-item-dot" title="Planned (not an issue yet)" />
      <button className="cgi-plan-card-main" onClick={onEdit} title="Edit plan item">
        <span className="cgi-plan-title">{item.title}</span>
        {item.note.trim() && <span className="cgi-plan-item-note">{item.note.trim()}</span>}
        <span className="cgi-plan-item-tag">plan</span>
      </button>
      <span className="cgi-plan-item-actions">
        <button className="cgi-plan-iaction" onClick={onPromote} disabled={promoting} title="Promote to GitHub issue">
          {promoting ? '…' : '⤴'}
        </button>
        <button className="cgi-plan-iaction" onClick={onEdit} title="Edit">✎</button>
        <button className="cgi-plan-iaction cgi-plan-idelete" onClick={onDelete} title="Delete">🗑</button>
      </span>
      <span className="cgi-plan-reorder">
        <button className="cgi-plan-arrow" disabled={index === 0} onClick={onMoveUp} title="Move up">▲</button>
        <button className="cgi-plan-arrow" disabled={index === count - 1} onClick={onMoveDown} title="Move down">▼</button>
      </span>
    </div>
  );
};
