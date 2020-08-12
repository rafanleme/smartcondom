select distinct m.nome as nome_menu,p.id
            from
            Acesso.usuarios u
             inner Join Acesso.usuarios_perfil u_p on u_p.usuario_id = u.id 
            inner Join Acesso.perfil p on p.id = u_p.perfil_id
            inner Join Acesso.perfil_menus p_m on p_m.perfil_id = p.id 
            inner Join Acesso.menus m on m.id = p_m.menu_id 
            inner join acesso.formularios f on f.id = m.formulario_id and f.sistema_id = m.sistema_id 
            where 
            u.usuario = 1
            and p.sistema_id = 17 and m.sistema_id = 17
            and u.status = 'ATIVO' and p.status = 'ATIVO' and p_m.status = 'ATIVO' and m.status = 'ATIVO'