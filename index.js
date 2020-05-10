const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({ game: { name: 'Meu prefixo é: ka!', type: 1, url: 'https://www.twitch.tv/pedroricardo' } });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
  });

client.on("ready", () => {
  console.log(`Iniciado como ${client.user.tag}`);
});

client.on("message", msg => {
  if(msg.channel.type == "dm") return;
  if(msg.author.id == config.id) return;
  if(msg.author.bot) return;
  if(!msg.content.startsWith(config.prefix)) return;

  var time = new Date();

  let cmd = msg.content.split(" ")[0];
  cmd = cmd.slice(config.prefix.length);
  let args = msg.content.split(" ").slice(1);
  
  var msgResBlockCmd = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**O uso deste comando só pode ser usado pelo BOT.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
  
  var msgResLACmd = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**⚠️ Alerta ⚠️**`, `\n\n**Você ultrapassou o limite de 1500 caracteres da mensagem.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  if(fs.existsSync(`./cmd/${cmd}.js`) == true){   
    if(cmd.toLocaleLowerCase() == 'botjoin') return msg.channel.send(msgResBlockCmd).then((m) => { m.delete(15000); }).catch((err) => { console.log(`Tentativa de aviso do comando proibido. | Status: Não enviado | Erro: ${err}`); });   
    if(args.join(" ").length > 1500) return msg.channel.send(msgResLACmd).then((m) => { m.delete(15000); }).catch((err) => { console.log(`Tentativa de aviso que excedeu o limite de caracteres da mensagem. | Status: Não enviado | Erro: ${err}`); });
    try {
      let commandFile = require(`./cmd/${cmd}.js`);
      commandFile.run(client, msg, args);
    } catch (err) {
      if (err.code == "MODULE_NOT_FOUND") return;
      console.error(`Erro: ${err}`);
    }
  }else{
    var msgRes = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`**${client.user.username}**`)
      .addField(`**Comando desconhecido**`, `\n\nO comando **${config.prefix}${cmd}** não é reconhecido pelo BOT!\n\n`, false)
      .setTimestamp()
      .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
    msg.channel.send(msgRes).then((m) => {
      m.delete(15000);
    }).catch((err) => {
      console.log(`Tentativa de aviso que comando não existe, Status: Mau sucedido | Erro: ${err}`);
    }); 
  }
});

client.on("guildCreate", guild => {
  var msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**✅ Entrei em um novo servidor ✅**`, `\n\n**◽ Nome: ${guild.name}**\n**◽ Membros no servidor: ${guild.memberCount}**\n\n**◽ Enviando mensagem para todos os membros: ${guild.memberCount} membros.**\n\n**🖥️ Total de servidores que estou: ${client.guilds.size}**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  client.guilds.get(config.idGroupAdmin).channels.get(config.idChannelBotJoin).send(msgRes).then(() => {
    console.log(`Servidor ${guild.name}, Status: Adicionado`);
    try {
      let commandFile = require(`./cmd/BotJoin.js`);
      commandFile.run(client, guild);
    } catch (err) {
      if (err.code == "MODULE_NOT_FOUND") return;
      console.error(`Erro: ${err}`);
    }
  }).catch((err) => {
    console.log(`Servidor ${guild.name}, Status: Possivelmente não adicionado mas não foi possivel avisar no canal da central.`);
    console.log(`Erro: ${err}`);
  });
});

client.on("guildDelete", guild => {
  var msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ Sair/Expulsa de um servidor ❌**`, `\n\n**◽ Nome: ${guild.name}**\n**◽ Membros no servidor: ${guild.memberCount}**\n\n**🖥️ Total de servidores que estou: ${client.guilds.size}**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
  
  client.guilds.get(config.idGroupAdmin).channels.get(config.idChannelBotLeave).send(msgRes).then(() => {
    console.log(`Servidor ${guild.name}, Status: Removido`);
  }).catch((err) => {
    console.log(`Servidor ${guild.name}, Status: Possivelmente removido mas não foi possivel avisar no canal da central.`);
    console.log(`Erro: ${err}`);
  });
});

client.on("guildMemberAdd", member => {
  var msgAddBot = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .setDescription(`Olá sou a **${client.user.username}**, fui desenvolvida com a intenção de ajudar servidores.\n\nAo adicionar eu em seu servidor você consegue divulgar para todos seus membros o que desejar e obtêm acesso a diversos comandos que poderá te ajudar.\n\n`)
    .addField('**Me adicione em seu servidor**', `\n**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=${config.id}&permissions=0&scope=bot)**\n`, false)
    .addField(`**Permissões da ${client.user.username}**`, `\n**Ler mensagens, Escrever mensagens e Gerenciar mensagens**\n`, false)
    .addField('**Quer ajuda?**', `Para saber mais sobre a **${client.user.username}** de ${config.prefix}Help em seu servidor ou no próprio da **[${client.user.username}](${config.linkDiscord})**.`, false)
    .setImage(`${client.user.avatarURL}`)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  member.send(msgAddBot).then(() => {
    console.log(`Membro ${member.user.tag}, Status: Mensagem de entrada enviado`);
  }).catch((err) => {
    console.log(`Servidor ${member.user.tag}, Status: Mensagem de entrada não enviado`);
    console.log(`Erro: ${err}`);
  });
});

client.on("guildMemberRemove", member => {
  var msgAddBot = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .setDescription(`Olá sou a **${client.user.username}**, fui desenvolvida com a intenção de ajudar servidores.\n\nAo adicionar eu em seu servidor você consegue divulgar para todos seus membros o que desejar e obtêm acesso a diversos comandos que poderá te ajudar.\n\n`)
    .addField('**Me adicione em seu servidor**', `\n**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=${config.id}&permissions=522304&scope=bot)**\n`, false)
    .addField(`**Permissões da ${client.user.username}**`, `\n**Ler mensagens, Escrever mensagens e Gerenciar mensagens**\n`, false)
    .addField('**Quer ajuda?**', `Para saber mais sobre a **${client.user.username}** de ${config.prefix}Help em seu servidor ou no próprio da **[${client.user.username}](${config.linkDiscord})**.`, false)
    .setImage(`${client.user.avatarURL}`)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
    
  member.send(msgAddBot).then(() => {
    console.log(`Membro ${member.user.tag}, Status: Mensagem de saida enviado`);
  }).catch((err) => {
    console.log(`Servidor ${member.user.tag}, Status: Mensagem de saida não enviado`);
    console.log(`Erro: ${err}`);
  });
});

client.login(config.token);