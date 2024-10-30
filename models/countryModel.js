


class Country {
  constructor(id, name, abbr) {
    this.id = id;
    this.name = name;
    this.abbr = abbr;
  }

  // Static method to map database row to Country model
  // mapper to map the datafields from database to our COUNTRY Model
  static fromRow(row) {
    return new Country(
      row.country_id,         
      row.country_name,       
      row.country_abbr,      
    );
  }
}

module.exports = Country;