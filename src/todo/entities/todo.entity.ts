import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('todos')
export class TodoEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty()
    @Column()
    name!: string

    @ApiProperty({default: ''})
    @Column({type: 'text', default: ''})
    description?: string;

    @ApiProperty({default: false})
    @Column({default: false})
    isDone?: boolean;
    
    @ApiProperty()
    @CreateDateColumn()
    createdAt?: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn({select: false})
    deleteAt?: null | Date;




}
