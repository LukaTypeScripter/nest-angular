import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false } )
  name: string;
  @Column({ unique: true })
  username: string;
}
