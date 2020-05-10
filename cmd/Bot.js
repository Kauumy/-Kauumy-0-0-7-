const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, msg, args) => {

  var msgResX = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**Você não possui permissão para executar este comando.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  var msgResX2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**O uso deste comando não é permitido neste canal.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  if(!config.idAdmin.find(id => id == msg.author.id)) return msg.channel.send(msgResX);
  if(msg.channel.id != config.idChannelAdmin) return msg.channel.send(msgResX2);
  
  let countMembers = client.users.size;
  let countSendO = 0;
  let countSendN = 0;

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

  const msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**Bot**`, `\n\n**Mensagem sendo enviada para ${countMembers} pessoas.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  try{
    msg.channel.send(msgRes);
    client.users.forEach((f) => {
      f.send(msgAddBot).then(() => {
        countSendO = countSendO+1;
        console.log(`Cliente: ${msg.author.tag} | Comando: Bot | Membro: ${f.tag} | Status: Mensagem enviada | Total enviadas ${countSendO} de ${countMembers}.`);
      }).catch(() => {
        countSendN = countSendN+1;
        console.log(`Cliente: ${msg.author.tag} | Comando: Bot | Membro: ${f.tag} | Status: Mensagem não enviada | Total não enviadas ${countSendN} de ${countMembers}.`);
      });
    });
  }catch(err){
    msg.channel.send(`Não foi iniciado o envio de mensagens, erro: ${err}`);
  }

}

