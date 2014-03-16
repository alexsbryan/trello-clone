json.array!(@cards) do |card|
  json.partial!("cards/card", :card => card)
end