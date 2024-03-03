import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    {id:1 , description: "Piedra del Alma", done: false},
    {id:2 , description: "Piedra del Tiempo", done: false},
    {id:3 , description: "Piedra del Espacio", done: true}
  ];

  create(createTodoDto: CreateTodoDto) : Todo{
    let todo = {
      id: Math.max(...this.todos.map(todo => todo.id), 0) + 1,
      description: createTodoDto.descripcion,
      done: false
    };
    this.todos.push(todo);
    return todo;
  }

  findAll() : Todo []{
    return this.todos;
  }

  findOne(id: number) : Todo{
    const todo = this.todos.find(todo => todo.id === id);
    if(!todo) throw new NotFoundException(`No se encontro el elemento ${id}`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    if(todo.done !== undefined) todo.done = updateTodoDto.done;
    if(todo.description) todo.description = updateTodoDto.descripcion;

    this.todos = this.todos.map(dbTodo => {
      if(dbTodo.id === id) return todo;
      return dbTodo;
    })

    return todo;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
