const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, guild) => {

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
  
  let all = guild.members;
  let countMembers = all.size;
  let countSendO = 0;
  let countSendN = 0;

  try{
    all.forEach((f) => {
      if (!f.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) { 
        f.send(msgAddBot).then(() => {
          countSendO = countSendO+1;
          console.log(`Cliente: BOT - MENSAGEM GRUPO NOVO | Comando: BotJoin | Membro: ${f.user.tag} | Status: Mensagem enviada | Total enviadas ${countSendO} de ${countMembers}.`);
        }).catch(() => {
          countSendN = countSendN+1;
          console.log(`Cliente: BOT - MENSAGEM GRUPO NOVO | Comando: BotJoin | Membro: ${f.user.tag} | Status: Mensagem não enviada | Total não enviadas ${countSendN} de ${countMembers}.`);
        });
      }else{
          countSendN = countSendN+1;
          console.log(`Cliente: BOT - MENSAGEM GRUPO NOVO | Comando: BotJoin | Membro: ${f.user.tag} (Ele é da STAFF) | Status: Mensagem não enviada | Total não enviadas ${countSendN} de ${countMembers}.`);
      }
    });
  }catch(err){
    msg.channel.send(`Não foi iniciado o envio de mensagens, erro: ${err}`);
  }

}

