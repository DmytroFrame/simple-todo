import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return await this.todoRepository.save(createTodoDto);
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findHistory(findDoneTodo: boolean): Promise<TodoEntity[]> {
    return await this.todoRepository.find({
      withDeleted: true,
      select: ['id', 'name', 'description', 'isDone', 'createdAt', 'updatedAt', 'deleteAt'],
      order: { updatedAt: 'DESC' },
      where: { deleteAt: Not(IsNull()), isDone: findDoneTodo },
    });
  }

  async findOne(id: number): Promise<TodoEntity> {
    const response = await this.todoRepository.findOneBy({ id });
    if (!response) {
      throw new NotFoundException(`Todo by id: ${id} not found.`);
    }
    return response;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const response = await this.todoRepository.update(id, updateTodoDto);
    if (!response.affected) {
      throw new ConflictException(`Toto was not successfully updated.`);
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<object> {
    const response = await this.todoRepository.softDelete(id);
    if (!response.affected) {
      throw new ConflictException(`Todo was not successfully deleted.`);
    }
    return {
      statusCode: 200,
      message: 'Todo deleted successfully.',
    };
  }
}
