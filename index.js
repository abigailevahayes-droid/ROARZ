const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const messageCache = new Map();

client.on('ready', () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Automod: Spam detection
  const userId = message.author.id;
  const now = Date.now();
  
  if (!messageCache.has(userId)) {
    messageCache.set(userId, []);
  }
  
  const userMessages = messageCache.get(userId);
  userMessages.push(now);
  
  const recentMessages = userMessages.filter(time => now - time < 5000);
  
  if (recentMessages.length > 5) {
    await message.delete().catch(() => {});
    return message.author.send('⚠️ Stop spamming!').catch(() => {});
  }
  
  messageCache.set(userId, recentMessages);

  // Role commands
  if (message.content.startsWith('!addrole')) {
    const args = message.content.slice(8).trim().split(/ +/);
    const roleName = args.join(' ');
    
    if (!roleName) return message.reply('Usage: `!addrole <role name>`');
    
    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
    if (!role) return message.reply('❌ Role not found');
    
    try {
      await message.member.roles.add(role);
      message.reply(`✅ Added role **${role.name}**`);
    } catch (error) {
      message.reply('❌ Failed to add role');
    }
  }

  if (message.content.startsWith('!removerole')) {
    const args = message.content.slice(11).trim().split(/ +/);
    const roleName = args.join(' ');
    
    if (!roleName) return message.reply('Usage: `!removerole <role name>`');
    
    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
    if (!role) return message.reply('❌ Role not found');
    
    try {
      await message.member.roles.remove(role);
      message.reply(`✅ Removed role **${role.name}**`);
    } catch (error) {
      message.reply('❌ Failed to remove role');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
