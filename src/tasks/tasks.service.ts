import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(taskFilterDto: TaskFilterDto): Task[] {
        const { status, search } = taskFilterDto;
        let tasks: Task[] = this.getTasks();

        if (Object.keys(taskFilterDto).length < 1) {
            return tasks;
        }

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    // Create
    createTask(taskCreateDto: TaskCreateDto): Task {
        const { title, description } = taskCreateDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    getTaskByID(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task ID "${id}" Not Found`);
        }

        return found;
    }

    deleteTask(id: string): void {
        const found = this.getTaskByID(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task: Task = this.getTaskByID(id);
        task.status = status;

        return task;
    }
}
