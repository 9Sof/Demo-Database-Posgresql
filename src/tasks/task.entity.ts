import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Rask extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    status: TaskStatus
}