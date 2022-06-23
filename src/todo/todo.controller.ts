import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseBoolPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Create Todo' })
  @ApiCreatedResponse({ type: TodoEntity })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'Get all Todos' })
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  @Get()
  findAll(): Promise<TodoEntity[]> {
    return this.todoService.findAll();
  }

  @ApiOperation({ summary: 'Get deleted Todos' })
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  @Get('history')
  findHistory(@Query('findDoneTodo', ParseBoolPipe) findDoneTodo?: boolean): Promise<TodoEntity[]> {
    return this.todoService.findHistory(findDoneTodo);
  }

  @ApiOperation({ summary: 'Get Todo by id' })
  @ApiOkResponse({ type: TodoEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Todo by id' })
  @ApiOkResponse({ type: TodoEntity })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findOne(id);
    return await this.todoService.update(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Delete Todo by id' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.findOne(id);
    return await this.todoService.remove(id);
  }
}
