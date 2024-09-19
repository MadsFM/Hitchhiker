using FluentValidation;
using service.TransferModels.Request;

namespace service.Validators;

public class CreatePlanetValidator : AbstractValidator<CreatePlanetDto>
{
    public CreatePlanetValidator()
    {
        RuleFor(p => p.Name)
            .MaximumLength(100)
            .NotEmpty();

        RuleFor(p => p.Description)
            .MaximumLength(300)
            .NotEmpty();

        RuleFor(p => p.Population)
            .GreaterThanOrEqualTo(0);

    }
}