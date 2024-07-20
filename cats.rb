require "faker"

cats = Faker::Lorem.sentences number: 12

grouped = []

cats.each_with_index do |cat|
  cat_hash = {
    title: cat
  }
  i = rand(2..7)
  if i % 2 == 0
    cat_hash[:sub] = Faker::Lorem.sentences number: i+1
  end
  grouped << cat_hash
end

pp grouped.to_json