import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	PrimaryColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from './user-roles.enum';

@Entity({ name: 'users' })
export class User {

	
	@PrimaryGeneratedColumn('increment',{
        type: 'integer',
        name: 'id',
      })
      id : number;
    
      @Column({
        type: 'varchar',
        unique: true,
        nullable :false,
        name: 'username',
      })
      username : string;
    
      @Column({
        type: 'varchar',
        nullable :false,
        name: 'password',
      })
      password : string;

	  @Column({
        type: 'varchar',
        nullable :true,
        name: 'email',
      })
      email : string;

	  @Column({
        type: 'varchar',
        nullable :true,
        name: 'token_2fa',
      })
      token_2fa : string;

	  @Column({
        type: 'varchar',
        nullable :true,
        name: 'code2f',
      })
      code2f : string;


	  @Column({
		type: 'enum',
		enum: UserRoles,
		nullable: false,
		name: 'role',
	  })
	  role: UserRoles;
	
	
}

export function getRoleFromString(roleString: string): UserRoles {
	console.log({ roleString });
	switch (roleString.toLowerCase()) {
		case 'admin':
			return UserRoles.Admin;
		case 'client':
			return UserRoles.Client;
		default:
			throw new Error('Invalid role');
	}
}
