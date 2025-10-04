"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react"

export interface TreeNode {
  name: string
  type: "file" | "folder"
  children?: readonly TreeNode[]
}

interface FolderTreeProps {
  node: TreeNode
  level?: number
}

export function FolderTree({ node, level = 0 }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(level < 2) // Auto-expand first 2 levels

  const isFolder = node.type === "folder"
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 hover:bg-accent/50 rounded px-2 -mx-2 cursor-pointer transition-colors ${
          level === 0 ? "font-semibold" : ""
        }`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder && hasChildren && (
          <span className="text-muted-foreground">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        )}
        {!isFolder && <span className="w-4" />}
        {isFolder ? <Folder className="h-4 w-4 text-accent" /> : <File className="h-4 w-4 text-muted-foreground" />}
        <span className={isFolder ? "text-foreground" : "text-muted-foreground"}>{node.name}</span>
      </div>

      {isFolder && isOpen && hasChildren && (
        <div>
          {node.children!.map((child, index) => (
            <FolderTree key={`${child.name}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
