local musicians = {
    {name = "Miles Davis", instrument = "trumpet"},
    {name = "John Coltrane", instrument = "saxophone"},
    {name = "David Gilmour", instrument = "guitar"},
    {name = "Tom Jobim", instrument = "piano"}
}

local s = table.sort(musicians, function(a, b)
    return a.name > b.name
end)

print(type(s))

-- for key, value in pairs(s) do
--     print(value)
-- end
