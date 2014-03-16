json.(list, :id, :title, :rank, :board_id, :created_at, :updated_at)

cards ||= nil
unless cards.nil?
  json.cards(cards) do |card|
    json.partial!("cards/card", :card => card)
  end
end


