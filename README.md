# GymPass Syle App

## RFs

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de checkins pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de checkins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias por nome;
- [ ] Deve ser possível o usuário realizar checkin em uma academia;
- [ ] Deve ser possível validar o checkin do usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs

- [x] O usuário não deve poder se cadastrar com um email já cadastrado;
- [ ] O usuário não deve poder fazer 2 checkins no mesmo dia;
- [ ] O usuário não deve poder fazer checkin se não estiver perto (100m) da academia;
- [ ] O checkin só pode ser validado até 20 minutos após criado;
- [ ] O checkin só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuario deve ser iddentificado por um JWT (JSON Web Token);
