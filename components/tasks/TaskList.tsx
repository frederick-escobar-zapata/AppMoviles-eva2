import TaskItem from '@/components/task-item';
import type { Task } from '@/constants/types';
import React from 'react';
import { View } from 'react-native';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onViewImage: (photoUri?: string) => void;
  onViewLocation: (location?: { latitude: number; longitude: number }) => void;
}

export default function TaskList({ tasks, onToggle, onRemove, onViewImage, onViewLocation }: TaskListProps) {
  return (
    <View>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onRemove={() => onRemove(task.id)}
          onViewImage={() => onViewImage(task.photoUri)}
          onViewLocation={() => onViewLocation(task.location)}
        />
      ))}
    </View>
  );
}
