#!/bin/bash

# Pantheon Install Script
# Copies selected or all agents to ~/.claude/agents/

AGENTS_DIR="$(dirname "$0")/agents"
CLAUDE_AGENTS="$HOME/.claude/agents"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "🏛️  Pantheon Agent Installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Create ~/.claude/agents if it doesn't exist
mkdir -p "$CLAUDE_AGENTS"

# Parse flags
INSTALL_ALL=false
GUILD=""
AGENT=""

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --all) INSTALL_ALL=true ;;
    --guild) GUILD="$2"; shift ;;
    --agent) AGENT="$2"; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

install_agent() {
  local name=$1
  local src="$AGENTS_DIR/$name/agent.md"
  local dest="$CLAUDE_AGENTS/$name.md"

  if [ -f "$src" ]; then
    cp "$src" "$dest"
    echo -e "${GREEN}✔${NC} $name"
  else
    echo -e "${YELLOW}⚠${NC} $name (agent.md not found, skipping)"
  fi
}

# Guild map
declare -A GUILDS
GUILDS[strategy]="hermes mnemon prometheus janus kraken"
GUILDS[design]="iris muse lumen kineto hestia"
GUILDS[engineering]="hephaestus athena talos pallas forge argus proteus chiron nyx helios"
GUILDS[sales]="nike peitho doros tyche"
GUILDS[marketing]="apollo calliope eos orpheus kratos"
GUILDS[domain]="asclepius plutus themis"
GUILDS[ops]="logos aura"

if [ "$INSTALL_ALL" = true ]; then
  echo "Installing all agents..."
  echo ""
  for guild in "${!GUILDS[@]}"; do
    echo -e "${BLUE}${guild^} Guild${NC}"
    for agent in ${GUILDS[$guild]}; do
      install_agent $agent
    done
    echo ""
  done

elif [ -n "$GUILD" ]; then
  guild_lower=$(echo "$GUILD" | tr '[:upper:]' '[:lower:]')
  if [ -n "${GUILDS[$guild_lower]}" ]; then
    echo -e "Installing ${BLUE}${GUILD^} Guild${NC}..."
    echo ""
    for agent in ${GUILDS[$guild_lower]}; do
      install_agent $agent
    done
  else
    echo "Unknown guild: $GUILD"
    echo "Available guilds: strategy, design, engineering, sales, marketing, domain, ops"
    exit 1
  fi

elif [ -n "$AGENT" ]; then
  echo "Installing $AGENT..."
  install_agent "$AGENT"

else
  # Interactive mode
  echo "What would you like to install?"
  echo ""
  echo "  1) All agents (32 total)"
  echo "  2) Strategy Guild (hermes, mnemon, prometheus, janus)"
  echo "  3) Design Guild (iris, muse, lumen, kineto, hestia)"
  echo "  4) Engineering Guild (hephaestus, athena, talos, pallas, forge, argus, proteus, chiron)"
  echo "  5) Sales Guild (nike, peitho, doros, tyche)"
  echo "  6) Marketing Guild (apollo, calliope, eos, orpheus, kratos)"
  echo "  7) Domain Guild (asclepius, plutus, themis)"
  echo "  8) Ops Guild (logos, aura)"
  echo "  9) Single agent"
  echo ""
  read -p "Choice [1-9]: " choice

  case $choice in
    1) bash "$0" --all ;;
    2) bash "$0" --guild strategy ;;
    3) bash "$0" --guild design ;;
    4) bash "$0" --guild engineering ;;
    5) bash "$0" --guild sales ;;
    6) bash "$0" --guild marketing ;;
    7) bash "$0" --guild domain ;;
    8) bash "$0" --guild ops ;;
    9)
      echo ""
      echo "Available agents:"
      ls "$AGENTS_DIR"
      echo ""
      read -p "Agent name: " agent_name
      bash "$0" --agent "$agent_name"
      ;;
    *) echo "Invalid choice"; exit 1 ;;
  esac
  exit 0
fi

echo ""
echo -e "${GREEN}Done!${NC} Agents installed to $CLAUDE_AGENTS"
echo ""
echo "Restart Claude Code to load the new agents."
echo ""
